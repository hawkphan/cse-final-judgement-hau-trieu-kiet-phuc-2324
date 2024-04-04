namespace Domain
{
    public class ProfileDto
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public double Gender { get; set; }
        public string DisplayName { get; set; }
        public IFormFile Avatar { get; set; }
    }
}