using API.DataAccess;
using API.ModelsDTO;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace API.Controllers
{
    public class ProductsController : ApiController
    {
        private readonly DataAccessProvider _dataAccessProvider;

        public ProductsController()
        {
            _dataAccessProvider = new DataAccessProvider();
        }

        public IHttpActionResult Get(string category = "", string createdBy = "")
        {
            DataTable result = _dataAccessProvider.GetProduct(category, createdBy);
            if (result != null)
            {
                return Ok(result);
            }
            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)404, new HttpError("Product Not Found")));
        }

        public IHttpActionResult Get(short productId)
        {
            DataTable result = _dataAccessProvider.GetProductOne(productId);
            if (result != null)
            {
                return Ok(result);
            }
            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)404, new HttpError("Product Not Found")));
        }

        public IHttpActionResult Post([FromBody] SaveProductDTO model)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (memberId != -1)
            {
                if (ModelState.IsValid)
                {
                    short productId;
                    string result = _dataAccessProvider.SaveProduct(out productId, model.ProductGroup, model.StartDate, model.EndDate, model.Subject, model.Content,
                                    model.OnHandStock, model.StandardPrice, model.MembershipPrice, memberId, model.IPAddress);
                    if (result.Length == 0)
                    {
                        return Ok(new { ProductId = productId });
                    }
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
            }
            return Unauthorized();
        }

        [Route("api/Products/UpdateImage")]
        public IHttpActionResult Post([FromBody] SaveProductImageDTO model)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (memberId != -1)
            {
                if (ModelState.IsValid)
                {
                    if(!_dataAccessProvider.IsProductExist(model.ProductID))
                    {
                        return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)404, new HttpError("Product Not Found")));
                    }
                    string result = _dataAccessProvider.SaveProductImage(model.ProductID, model.ImageName, model.ImagePath, memberId);
                    if (result.Length == 0)
                    {
                        return Ok();
                    }
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
            }
            return Unauthorized();
        }

        [Route("api/Products/Update")]
        public IHttpActionResult Post([FromBody] UpdateProductDTO model)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (memberId != -1)
            {
                if (ModelState.IsValid)
                {
                    if (!_dataAccessProvider.IsProductExist(model.ProductID))
                    {
                        return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)404, new HttpError("Product Not Found")));
                    }
                    string result = _dataAccessProvider.SaveProduct(model.ProductID, model.ProductGroup, model.StartDate, model.EndDate, model.Subject, model.Content,
                                    model.OnHandStock, model.StandardPrice, model.MembershipPrice, memberId, model.IPAddress);
                    if (result.Length == 0)
                    {
                        return Ok();
                    }
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
            }
            return Unauthorized();
        }

        public IHttpActionResult Delete(short productId)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (memberId != -1)
            {
                if (!_dataAccessProvider.IsProductExist(productId))
                {
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)404, new HttpError("Product Not Found")));
                }
                string result = _dataAccessProvider.RemoveProduct(productId);
                if (result.Length == 0)
                {
                    return Ok();
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
            }
            return Unauthorized();
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