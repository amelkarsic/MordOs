﻿using Microsoft.EntityFrameworkCore;
using MordOs.Infrastucture;
using MordOs.Infrastucture.Entities;

namespace MordOs.Services
{
    public interface IDocumentService
    {
        Task CreateFileAsync(DocDto doc, CancellationToken cancellationToken);
        Task<List<DocDto>> GetDocuments(bool isSortedAsc, CancellationToken cancellationToken);
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

        public async Task<List<DocDto>> GetDocuments(bool isSortedAsc, CancellationToken cancellationToken)
        {
            var documents = await _mordDbContext.Documents
                .Select(x => new DocDto { Id = x.Id, Text = x.Text, Title = x.Title })
                .OrderBy(x => x.Title)
                .ToListAsync(cancellationToken);

            return isSortedAsc ? documents : documents.OrderByDescending(x => x.Title).ToList();
        }
    }

    public class DocDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Title { get; set; }
    }
}
