using API.DataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace API.Controllers
{
    public class ProductGroupController : ApiController
    {
        private readonly DataAccessProvider _dataAccessProvider;

        public ProductGroupController()
        {
            _dataAccessProvider = new DataAccessProvider();
        }

        public IHttpActionResult Get()
        {
            var result = _dataAccessProvider.GetProductGroupMaster();
            if (result != null)
            {
                return Ok(result);
            }
            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)404, new HttpError("Product Group Not Found")));
        }
    }
}