
using System.ComponentModel.DataAnnotations;

namespace API.ModelsDTO
{
    public class LoginMemberDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}