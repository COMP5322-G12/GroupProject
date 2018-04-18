using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    /// <summary>
    /// Summary description for ProductMaster
    /// </summary>
    [Serializable()]
    public class ProductMaster
    {
        #region Private Attribute
        private Int16 productid = -1;
        private string productgroup = "";
        private DateTime startdate = DateTime.Now;
        private DateTime enddate = DateTime.Now;
        private string productsubject = "";
        private string productcontent = "";
        private string productdisplaycontent = "";
        private string imagename = "";
        private string imagepath = "";
        private double standardprice = 0;
        private double memberprice = 0;
        #endregion

        #region Constructor
        public ProductMaster()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        #endregion

        #region Method
        /// <summary>
        /// Clean up all previous session relating to the member.
        /// </summary>
        public void CleanUpPreviousSession()
        {
            this.productid = -1;
            this.productgroup = "";
            this.startdate = DateTime.Now;
            this.enddate = DateTime.Now;
            this.productsubject = "";
            this.productcontent = "";
            this.productdisplaycontent = "";
            this.imagename = "";
            this.imagepath = "";
            this.standardprice = 0;
            this.memberprice = 0;
        }
        #endregion

        #region Get/Set Method
        public Int16 ProductID
        {
            get
            {
                return this.productid;
            }

            set
            {
                this.productid = value;
            }
        }

        public string ProductGroup
        {
            get
            {
                return this.productgroup;
            }

            set
            {
                this.productgroup = value;
            }
        }

        public DateTime StartDate
        {
            get
            {
                return this.startdate;
            }

            set
            {
                this.startdate = value;
            }
        }

        public DateTime EndDate
        {
            get
            {
                return this.enddate;
            }

            set
            {
                this.enddate = value;
            }
        }

        public string ProductSubject
        {
            get
            {
                return this.productsubject;
            }

            set
            {
                this.productsubject = value;
            }
        }

        public string ProductContent
        {
            get
            {
                return this.productcontent;
            }

            set
            {
                this.productcontent = value;
            }
        }

        public string ProductDisplayContent
        {
            get
            {
                return this.productdisplaycontent;
            }

            set
            {
                this.productdisplaycontent = value;
            }
        }

        public string ImageName
        {
            get
            {
                return this.imagename;
            }

            set
            {
                this.imagename = value;
            }
        }

        public string ImagePath
        {
            get
            {
                return this.imagepath;
            }

            set
            {
                this.imagepath = value;
            }
        }

        public double StandardPrice
        {
            get
            {
                return this.standardprice;
            }

            set
            {
                this.standardprice = value;
            }
        }

        public double MemberPrice
        {
            get
            {
                return this.memberprice;
            }

            set
            {
                this.memberprice = value;
            }
        }

        #endregion
    }
}