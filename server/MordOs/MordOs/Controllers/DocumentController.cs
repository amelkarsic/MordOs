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
        public async Task<ActionResult> GetDocuments(CancellationToken cancellationToken)
        {
            try
            {
                var documents = await _documentService.GetDocuments( cancellationToken);

                return Ok(documents);
            }
            catch
            {
                return BadRequest();
            }
        }
    }

}
