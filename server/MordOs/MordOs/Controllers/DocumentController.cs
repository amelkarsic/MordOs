using Microsoft.AspNetCore.Mvc;
using MordOs.Services;

namespace MordOs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private readonly IDocumentService _documentService;
        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] DocDto doc, CancellationToken cancellationToken)
        {
            try
            {
                await _documentService.CreateFileAsync(doc, cancellationToken);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetDocuments([FromQuery] bool isSortedAsc, CancellationToken cancellationToken)
        {
            try
            {
                var documents = await _documentService.GetDocumentsAsync(isSortedAsc, cancellationToken);

                return Ok(documents);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult> EditDocuments([FromBody] DocDto newDoc, CancellationToken cancellationToken)
        {
            try
            {
                await _documentService.EditDocumentAsync(newDoc, cancellationToken);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDocument([FromRoute] int id, CancellationToken cancellationToken)
        {
            try
            {
                await _documentService.DeleteDocumentAsync(id, cancellationToken);

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }

}
