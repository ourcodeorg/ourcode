use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use std::env;
use dotenv::dotenv;
use tracing_subscriber::filter::LevelFilter;

mod db;
use db::connect_to_db;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    tracing_subscriber::fmt()
        .with_max_level(LevelFilter::DEBUG)
        .with_test_writer()
        .init();
    connect_to_db().await.expect("Unable to connect to db");

    println!("Listening on 8080");
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}