using API.DataAccess;
using API.ModelsDTO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace API.Controllers
{
    public class LoginController : ApiController
    {
        private readonly DataAccessProvider _dataAccessProvider;

        public LoginController()
        {
            _dataAccessProvider = new DataAccessProvider();
        }

        [HttpOptions]
        [HttpPost]
        public IHttpActionResult Post([FromBody] LoginMemberDTO model)
        {
            if (ModelState.IsValid)
            {
                var result = _dataAccessProvider.GetAuth(model.Email, model.Password);
                if (result == null)
                {
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
                }
                if (result.Length > 0)
                {
                    return Ok(new { AuthKey = result });
                }
            }
            return Unauthorized();
        }
    }
}