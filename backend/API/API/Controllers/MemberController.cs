using API.DataAccess;
using API.ModelsDTO;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace API.Controllers
{
    public class MemberController : ApiController
    {
        private readonly DataAccessProvider _dataAccessProvider;

        public MemberController()
        {
            _dataAccessProvider = new DataAccessProvider();
        }

        [Route("api/Member")]
        public IHttpActionResult Get()
        {
            var result = _dataAccessProvider.GetMember(AuthKey);
            if (result != null)
            {
                return Ok(new { result.MemberID, result.FirstName, result.MiddleName, result.LastName, result.Gender, result.BirthDay, result.BirthMonth, result.BirthYear, result.EMail, result.ContactPhone, result.Building, result.Street, result.City, result.Zip, result.ImageName, result.ImagePath });
            }
            return Unauthorized();
        }

        [Route("api/Member/Register")]
        public IHttpActionResult Post([FromBody] SaveMemberDTO model)
        {
            if (ModelState.IsValid)
            {
                var result = _dataAccessProvider.SaveMember(-1, model.FirstName, model.MiddleName, model.LastName, model.Gender, model.BirthDay, model.BirthMonth, model.BirthYear, model.Building, model.Street, model.City, model.State,
                            model.Zip, model.Email, model.Password, model.ContactPhone, -1, model.IPAddress);
                if (result.Length == 0)
                {
                    var result2 = _dataAccessProvider.GetAuth(model.Email, model.Password);
                    if (result2 == null)
                    {
                        return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
                    }
                    if (result2.Length > 0)
                    {
                        return Ok(new { AuthKey = result2 });
                    }
                    return Unauthorized();
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
            }
            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
        }
        [Route("api/Member/UpdateImage")]
        public IHttpActionResult Post([FromBody] SaveMemberImageDTO model)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (memberId != -1)
            {
                if (ModelState.IsValid)
                {
                    var result = _dataAccessProvider.SaveMemberImage(memberId, model.ImageName, model.ImagePath, memberId, model.IPAddress);
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

        [Route("api/Member/Update")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] UpdateMemberDTO model)
        {
            short memberId = _dataAccessProvider.GetMemberId(AuthKey);
            if (memberId != -1)
            {
                if (ModelState.IsValid)
                {
                    var result = _dataAccessProvider.SaveMember(memberId, model.FirstName, model.MiddleName, model.LastName, model.Gender, model.BirthDay, model.BirthMonth, model.BirthYear, model.Building, model.Street, model.City, model.State,
                                model.Zip, null, model.Password, model.ContactPhone, memberId, model.IPAddress);
                    if (result.Length == 0)
                    {
                        var result2 = _dataAccessProvider.GetMember(AuthKey);
                        if (result2 != null)
                        {
                            return Ok(new { result2.MemberID, result2.FirstName, result2.MiddleName, result2.LastName, result2.Gender, result2.BirthDay, result2.BirthMonth, result2.BirthYear, result2.EMail, result2.ContactPhone, result2.Building, result2.Street, result2.City, result2.Zip, result2.ImageName, result2.ImagePath });
                        }
                    }
                    return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
                }
                return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError("Form Error")));
            }
            return Unauthorized();
        }

        //[Route("api/Member/UploadImage")]
        //public async Task<IHttpActionResult> PostFormData([FromUri]string ipAddress)
        //{
        //    short memberId = _dataAccessProvider.GetMemberId(AuthKey);
        //    memberId = 19;
        //    if (memberId != -1)
        //    {
        //        // Check if the request contains multipart/form-data.
        //        if (!Request.Content.IsMimeMultipartContent())
        //        {
        //            throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //        }

        //        string root = System.Web.Hosting.HostingEnvironment.MapPath("~/Images");
        //        var provider = new MultipartFormDataStreamProvider(root);
        //        try
        //        {
        //            await Request.Content.ReadAsMultipartAsync(provider);
        //            var files = new List<string>();
        //            foreach (MultipartFileData file in provider.FileData)
        //            {
        //                files.Add(Path.GetFileName(file.LocalFileName));
        //            }
        //            var result = _dataAccessProvider.SaveMemberImage(memberId, files[0], files[0], memberId, ipAddress);
        //            if (result.Length == 0)
        //            {
        //                return Ok();
        //            }
        //            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(result))));
        //        }
        //        catch (System.Exception e)
        //        {
        //            return new ResponseMessageResult(Request.CreateErrorResponse((HttpStatusCode)422, new HttpError(Common.Common.ReplaceError(e.Message))));
        //        }
        //    }
        //    return Unauthorized();
        //}

        //public byte[] Base64ToByteArray(string base64String)
        //{
        //    return System.Convert.FromBase64String(base64String);
        //}

        //public Image Base64ToImage(string base64String)
        //{
        //    byte[] imageBytes = System.Convert.FromBase64String(base64String);
        //    MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);

        //    ms.Write(imageBytes, 0, imageBytes.Length);
        //    return Image.FromStream(ms, true);
        //}

        //private MemoryStream CopyFileToMemory(string path)
        //{
        //    MemoryStream ms = new MemoryStream();
        //    FileStream fs = new FileStream(path, FileMode.Open);
        //    fs.Position = 0;
        //    fs.CopyTo(ms);
        //    fs.Close();
        //    fs.Dispose();
        //    return ms;
        //}

        //[Route("api/Member/MyImage")]
        //[HttpGet]
        //public string Get(string id)
        //{
        //    string path = System.Web.Hosting.HostingEnvironment.MapPath($@"~/Images/{id}");
        //    byte[] b = File.ReadAllBytes(path);
        //    return "data:image/png;base64," + System.Convert.ToBase64String(b);
        //}

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