using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Sales
    {
        public List<CartProduct> CartProduct { get; set; }
        public int Total { get; set; }
        public OrderPerson OrderPerson { get; set; }
        public Payment Payment { get; set; }
        public string IpAddress { get; set; }
    }

    public class CartProduct
    {
        public short ProductID { get; set; }
        public short Total { get; set; }
        public double StandardPrice { get; set; }
        public double MembershipPrice { get; set; }
    }

    public class OrderPerson
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Building { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Email { get; set; }
        public string ContactPhone { get; set; }
    }

    public class Payment
    {
        public bool Paid { get; set; }
        public bool Cancelled { get; set; }
        public string PayerID { get; set; }
        public string PaymentID { get; set; }
        public string PaymentToken { get; set; }
        public string ReturnUrl { get; set; }
        public string Email { get; set; }
    }
}