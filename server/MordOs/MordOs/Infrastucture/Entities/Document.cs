using MordOs.Enums;

namespace MordOs.Infrastucture.Entities
{
    public class Document
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }
        public DirectoryEnum Directory { get; set; }
    }
}
