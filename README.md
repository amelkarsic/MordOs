# MordOs

To run client you need do following steps:
```sh
npm i
npm start
```

To run backend you need to have postgres and Visual Strudio.If you set different password for you Postgresql server you need to update Program.cs:
```sh
builder.Services.AddDbContext<IMordDbContext, MordDbContext>(opts => opts.UseNpgsql("Server=localhost;Database=MordOs4;Username=postgres;Password=yourSpecificPw"));
```
Once you open project in Package Manager Console you need too run
```sh
update-database
```

After your database is formed, you can just run your server.
