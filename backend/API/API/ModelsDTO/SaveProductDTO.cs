
using System.ComponentModel.DataAnnotations;

namespace API.ModelsDTO
{
    public class SaveProductDTO
    {
        [Required]
        public string ProductGroup { get; set; }
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public short OnHandStock { get; set; }
        [Required]
        public double StandardPrice { get; set; }
        [Required]
        public double MembershipPrice { get; set; }
        [Required]
        public string IPAddress { get; set; }
    }
}