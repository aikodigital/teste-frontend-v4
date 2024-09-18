using aiko.Services; // Certifique-se de que o namespace correto do DataService est� inclu�do

var builder = WebApplication.CreateBuilder(args);

// Adicione os servi�os ao container.
builder.Services.AddControllersWithViews();

// Registre o DataService no container de inje��o de depend�ncias
builder.Services.AddScoped<DataService>();

var app = builder.Build();

// Configure o pipeline de requisi��o HTTP.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Configure a rota padr�o
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
