using System.ComponentModel.DataAnnotations;

namespace API.ModelsDTO
{
    public class SaveMemberImageDTO
    {
        [Required]
        public string ImageName { get; set; }
        [Required]
        public string ImagePath { get; set; }
        [Required]
        public string IPAddress { get; set; }
    }
}