using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    /// <summary>
    /// Summary description for LoginMember
    /// </summary>
    [Serializable()]
    public class LoginMember
    {
        #region Private Attribute
        private Int16 memberid = -1;
        private string firstname = "";
        private string middlename = "";
        private string lastname = "";
        private string gender = "";
        private string birthday = "";
        private string birthmonth = "";
        private string birthyear = "";
        private string building = "";
        private string street = "";
        private string city = "";
        private string state = "";
        private string zip = "";
        private string email = "";
        private string password = "";
        private string contactphone = "";
        private string imagename = "";
        private string imagepath = "";
        #endregion

        #region Constructor
        public LoginMember()
        {
            //
            // TODO: Add constructor logic here
            //
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

        public string FirstName
        {
            get
            {
                return this.firstname;
            }

            set
            {
                this.firstname = value;
            }
        }

        public string MiddleName
        {
            get
            {
                return this.middlename;
            }

            set
            {
                this.middlename = value;
            }
        }

        public string LastName
        {
            get
            {
                return this.lastname;
            }

            set
            {
                this.lastname = value;
            }
        }

        public string Gender
        {
            get
            {
                return this.gender;
            }

            set
            {
                this.gender = value;
            }
        }

        public string BirthDay
        {
            get
            {
                return this.birthday;
            }

            set
            {
                this.birthday = value;
            }
        }

        public string BirthMonth
        {
            get
            {
                return this.birthmonth;
            }

            set
            {
                this.birthmonth = value;
            }
        }

        public string BirthYear
        {
            get
            {
                return this.birthyear;
            }

            set
            {
                this.birthyear = value;
            }
        }

        public string Building
        {
            get
            {
                return this.building;
            }

            set
            {
                this.building = value;
            }
        }

        public string Street
        {
            get
            {
                return this.street;
            }

            set
            {
                this.street = value;
            }
        }

        public string City
        {
            get
            {
                return this.city;
            }

            set
            {
                this.city = value;
            }
        }

        public string State
        {
            get
            {
                return this.state;
            }

            set
            {
                this.state = value;
            }
        }

        public string Zip
        {
            get
            {
                return this.zip;
            }

            set
            {
                this.zip = value;
            }
        }

        public string EMail
        {
            get
            {
                return this.email;
            }

            set
            {
                this.email = value;
            }
        }

        public string Password
        {
            get
            {
                return this.password;
            }

            set
            {
                this.password = value;
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
        #endregion
    }
}