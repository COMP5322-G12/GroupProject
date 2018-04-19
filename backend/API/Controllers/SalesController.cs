using API.DataAccess;
using API.Models;
using API.ModelsDTO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace API.Controllers
{
    public class SalesController : ApiController
    {
        private readonly DataAccessProvider _dataAccessProvider;

        public SalesController()
        {
            _dataAccessProvider = new DataAccessProvider();
        }

        public IHttpActionResult Post(Sales item)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (item != null)
            {
                if(item.Payment != null && item.Payment.Paid == true)
                {
                    string strInvNo = "";
                    string result = _dataAccessProvider.SaveSalesMaster(out strInvNo, memberId, $"{item.OrderPerson?.FirstName ?? ""} {item.OrderPerson?.LastName ?? ""}", item.OrderPerson?.Building ?? "",
                        item.OrderPerson?.Street ?? "", item.OrderPerson?.City ?? "", item.OrderPerson?.State ?? "", item.OrderPerson?.Zip ?? "", item.OrderPerson?.Email ?? "",
                        item.OrderPerson?.ContactPhone ?? "", memberId, item.IpAddress ?? "");
                    if (result.Length == 0 && strInvNo.Length > 0)
                    {
                        for (short i = 0; i < item.CartProduct.Count; i++)
                        {
                            string result2 = "";
                            if (memberId != -1)
                            {
                                result2 = _dataAccessProvider.SaveSalesDetail(strInvNo, i, item.CartProduct[i].ProductID, item.CartProduct[i].Total, item.CartProduct[i].MembershipPrice, item.CartProduct[i].StandardPrice);
                            }
                            else
                            {
                                result2 = _dataAccessProvider.SaveSalesDetail(strInvNo, i, item.CartProduct[i].ProductID, 1, item.CartProduct[i].StandardPrice, item.CartProduct[i].MembershipPrice);
                            }
                            if (result2.Length > 0)
                            {
                                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result2))));
                            }
                        }
                        return Ok();
                    }
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Not Paid")));
            }
            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Json Error")));
        }

        private string AuthKey
        {
            get
            {
                IEnumerable<string> headerValues;
                var authKey = string.Empty;
                if (Request.Headers.TryGetValues("AuthKey", out headerValues))
                {
                    authKey = headerValues.FirstOrDefault();
                }
                return authKey;
            }
        }
    }
}