using ForeverEcom.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ForeverEcom.API.Controllers;

[ApiController]
public abstract class BaseController : ControllerBase
{
    protected Guid UserId =>
        Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier) ??
                       User.FindFirstValue("id"), out var id) ? id : Guid.Empty;

    protected string UserName => User.FindFirstValue(ClaimTypes.Name) ?? string.Empty;

    protected bool IsAdmin => User.IsInRole("admin");
}
