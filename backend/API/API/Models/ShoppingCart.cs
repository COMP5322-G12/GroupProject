using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    /// <summary>
    /// Summary description for ShoppingCart
    /// </summary>
    [Serializable()]
    public class ShoppingCart
    {
        #region Private Attribute        
        private Int16 memberid = -1;
        private string customername = "";
        private string buildingtodelivery = "";
        private string streettodelivery = "";
        private string citytodelivery = "";
        private string statetodelivery = "";
        private string ziptodelivery = "";
        private string emailaddress = "";
        private string contactphone = "";
        private OrderList orderlist = new OrderList();
        #endregion

        #region Constructor
        public ShoppingCart()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        #endregion

        #region Method
        /// <summary>
        /// Obtain the specified product item according to its index in the order list of the shopping cart.
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        public ProductMaster GetItem(int index)
        {
            return (ProductMaster)orderlist.ElementAt(index);
        }

        /// <summary>
        /// Clean up all previous session relating to the shopping cart.
        /// </summary>
        public void CleanUpPreviousSession()
        {
            this.memberid = -1;
            this.customername = "";
            this.buildingtodelivery = "";
            this.streettodelivery = "";
            this.citytodelivery = "";
            this.statetodelivery = "";
            this.ziptodelivery = "";
            this.emailaddress = "";
            this.contactphone = "";
            this.orderlist = new OrderList();
        }
        #endregion

        #region Get/Set Method
        public Int16 MemberID
        {
            get
            {
                return this.memberid;
            }

            set
            {
                this.memberid = value;
            }
        }

        public string CustomerName
        {
            get
            {
                return this.customername;
            }

            set
            {
                this.customername = value;
            }
        }

        public string BuildingToDelivery
        {
            get
            {
                return this.buildingtodelivery;
            }
            set
            {
                this.buildingtodelivery = value;
            }
        }

        public string StreetToDelivery
        {
            get
            {
                return this.streettodelivery;
            }
            set
            {
                this.streettodelivery = value;
            }
        }

        public string CityToDelivery
        {
            get
            {
                return this.citytodelivery;
            }
            set
            {
                this.citytodelivery = value;
            }
        }

        public string StateToDelivery
        {
            get
            {
                return this.statetodelivery;
            }
            set
            {
                this.statetodelivery = value;
            }
        }

        public string ZipToDelivery
        {
            get
            {
                return this.ziptodelivery;
            }
            set
            {
                this.ziptodelivery = value;
            }
        }

        public string EMailAddress
        {
            get
            {
                return this.emailaddress;
            }
            set
            {
                this.emailaddress = value;
            }
        }

        public string ContactPhone
        {
            get
            {
                return this.contactphone;
            }
            set
            {
                this.contactphone = value;
            }
        }

        public OrderList OrderList
        {
            get
            {
                return this.orderlist;
            }
            set
            {
                this.orderlist = value;
            }
        }

        public double GrandTotalStandard
        {
            get
            {
                double subtotal = -1;

                if (this.orderlist != null)
                {
                    subtotal = 0;

                    for (int i = 0; i < this.NumberOfItems; i++)
                    {
                        ProductMaster productmaster = (ProductMaster)this.GetItem(i);
                        subtotal += productmaster.StandardPrice;
                    }
                }

                return subtotal;
            }
        }

        public double GrandTotalMember
        {
            get
            {
                double subtotal = -1;

                if (this.orderlist != null)
                {
                    subtotal = 0;

                    for (int i = 0; i < this.NumberOfItems; i++)
                    {
                        ProductMaster productmaster = (ProductMaster)this.GetItem(i);
                        subtotal += productmaster.MemberPrice;
                    }
                }

                return subtotal;
            }
        }

        public int NumberOfItems
        {
            get
            {
                if (this.orderlist != null)
                {
                    return this.orderlist.NumberOfRecord;
                }

                return 0;
            }
        }
        #endregion
    }
}