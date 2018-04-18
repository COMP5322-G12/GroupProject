
using System.ComponentModel.DataAnnotations;


namespace API.ModelsDTO
{
    public class SaveProductImageDTO
    {
        [Required]
        public short ProductID { get; set; }
        [Required]
        public string ImageName { get; set; }
        [Required]
        public string ImagePath { get; set; }
    }
}