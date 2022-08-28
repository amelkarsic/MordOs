using Microsoft.EntityFrameworkCore;
using MordOs.Infrastucture;
using MordOs.Infrastucture.Entities;

namespace MordOs.Services
{
    public interface IDocumentService
    {
        Task CreateFileAsync(DocDto doc, CancellationToken cancellationToken);
        Task<List<DocDto>> GetDocumentsAsync(bool isSortedAsc, CancellationToken cancellationToken);
        Task EditDocumentAsync(DocDto newDoc, CancellationToken cancellationToken);
        Task DeleteDocumentAsync(int id, CancellationToken cancellationToken);
    }
    public class DocumentService : IDocumentService
    {
        private readonly IMordDbContext _mordDbContext;
        public DocumentService(IMordDbContext mordDbContext)
        {
            _mordDbContext = mordDbContext;
        }

        public async Task CreateFileAsync(DocDto doc, CancellationToken cancellationToken)
        {
            _mordDbContext.Documents.Add(new Document
            {
                Text = doc.Text,
                Title = doc.Title,
            });

            await _mordDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<DocDto>> GetDocumentsAsync(bool isSortedAsc, CancellationToken cancellationToken)
        {
            var documents = await _mordDbContext.Documents
                .Select(x => new DocDto { Id = x.Id, Text = x.Text, Title = x.Title })
                .OrderBy(x => x.Title)
                .ToListAsync(cancellationToken);

            return isSortedAsc ? documents : documents.OrderByDescending(x => x.Title).ToList();
        }

        public async Task EditDocumentAsync(DocDto newDoc, CancellationToken cancellationToken)
        {
            var document = await _mordDbContext.Documents.FirstOrDefaultAsync(x => x.Id == newDoc.Id);

            if (document == null)
            {
                throw new ArgumentException("Document not found!");
            }

            document.Text = newDoc.Text;
            document.Title = newDoc.Title;

            await _mordDbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task DeleteDocumentAsync(int id, CancellationToken cancellationToken)
        {
            var document = await _mordDbContext.Documents.FirstOrDefaultAsync(x => x.Id == id);

            if (document == null)
            {
                throw new ArgumentException("Document not found!");
            }

            _mordDbContext.Documents.Remove(document);
            await _mordDbContext.SaveChangesAsync(cancellationToken);
        }
    }

    public class DocDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }
    }
}
