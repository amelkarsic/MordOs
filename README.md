# MordOs

To run client you need do following steps:
```sh
npm i
npm start
```

To run the backend you need to have Postgres and Visual Studio. If you set a different password for your Postgresql server you need to update Program.cs:
```sh
builder.Services.AddDbContext<IMordDbContext, MordDbContext>(opts => opts.UseNpgsql("Server=localhost;Database=MordOs4;Username=postgres;Password=yourSpecificPw"));
```
Once you open the project in the Package Manager Console you need to run
```sh
update-database
```

After your database is formed, you can just run your server.
