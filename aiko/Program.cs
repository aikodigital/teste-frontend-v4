using aiko.Services; // Certifique-se de que o namespace correto do DataService está incluído

var builder = WebApplication.CreateBuilder(args);

// Adicione os serviços ao container.
builder.Services.AddControllersWithViews();

// Registre o DataService no container de injeção de dependências
builder.Services.AddScoped<DataService>();

var app = builder.Build();

// Configure o pipeline de requisição HTTP.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Configure a rota padrão
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
