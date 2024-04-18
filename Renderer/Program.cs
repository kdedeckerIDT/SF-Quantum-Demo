using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Progress.Sitefinity.AspNetCore;
using Progress.Sitefinity.AspNetCore.ViewComponents;
using Progress.Sitefinity.AspNetCore.Widgets.Models.ContentList;
using Progress.Sitefinity.AspNetCore.Widgets.Models.Form;
using Progress.Sitefinity.AspNetCore.FormWidgets;
using Progress.Sitefinity.Renderer.Designers;
using Renderer.Attributes;
using Renderer.Client;
using Renderer.Entities.Extends;
using Renderer.Models;
using Renderer.Models.Document;
using Renderer.Models.Extends;
using Renderer.Models.LanguageSelector;
using Renderer.Models.NativeChat;
using Renderer.Models.Testimonial;
using Renderer.Models.LoginStatus;
using script_widget;

var builder = WebApplication.CreateBuilder(args);

// add sitefinity related services
builder.Services.AddScoped<ITestimonialModel, TestimonialModel>();
builder.Services.AddScoped<IDocumentModel, DocumentModel>();
builder.Services.AddScoped<IMegaMenuModel, MegaMenuModel>();
builder.Services.AddScoped<LanguageSelectorModel>();

// Content security policy (CSP) API: Add external source as trusted
/* DEBUG/DEV ONLY */
builder.Services.AddSitefinity(x => x.CspOptions.Disabled = true);

/*
builder.Services.AddSitefinity(x => x.CspOptions.CspDelegate = (cspDirectives, httpContext) =>
{
    cspDirectives.DefaultSrc += "";
    cspDirectives.StyleSrc += "*localhost 'unsafe-inline'";
    cspDirectives.ImgSrc += "*localhost";
    cspDirectives.ScriptSrc += " 'unsafe-eval' https://localhost:5001";
    cspDirectives.ConnectSrc += " wss: ws: http://localhost:56523 https://localhost:5001";
});
*/

builder.Services.AddViewComponentModels();
builder.Services.AddFormViewComponentModels();
builder.Services.AddScoped<IContentListModel, ExtendedContentListModel>();
builder.Services.AddSingleton<IEntityExtender, EntityExtender<ContentListEntity, ExtendedContentListEntity>>();
builder.Services.AddScoped<IFormModel, ExtendedFormModel>();
builder.Services.AddSingleton<IEntityExtender, EntityExtender<FormEntity, ExtendedFormEntity>>();
builder.Services.AddScoped<INativeChatModel, NativeChatModel>();
builder.Services.AddSingleton<INativeChatClient, NativeChatClient>();
builder.Services.AddSingleton<IPropertyConfigurator, ExternalPropertyConfigurator>();
builder.Services.AddScoped<ILoginStatusModel, LoginStatusModel>();
builder.Services.AddScoped<IScriptRepository, ScriptRepository>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStaticFiles();
app.UseRouting();
app.UseSitefinity();

app.Run();
