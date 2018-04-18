using System.ComponentModel.DataAnnotations;

namespace API.ModelsDTO
{
    public class SaveMemberDTO
    {
        [Required]
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string BirthDay { get; set; }
        [Required]
        public string BirthMonth { get; set; }
        [Required]
        public string BirthYear { get; set; }
        public string Building { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string ContactPhone { get; set; }
        [Required]
        public string IPAddress { get; set; }
    }
}