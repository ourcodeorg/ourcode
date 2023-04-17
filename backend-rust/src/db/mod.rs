use std::env;
use std::time::Duration;
use sea_orm::{ConnectOptions, Database, DatabaseConnection, };

pub async fn connect_to_db() -> std::io::Result< DatabaseConnection> {
  let url = env::var("DATABASE_URL").expect("Expected to find `DATABASE_URL` variable in `.env` file");
  let mut opt = ConnectOptions::new(url);
  opt.max_connections(100)
      .min_connections(5)
      .connect_timeout(Duration::from_secs(8))
      .acquire_timeout(Duration::from_secs(8))
      .idle_timeout(Duration::from_secs(8))
      .max_lifetime(Duration::from_secs(8))
      .sqlx_logging(true)
      .sqlx_logging_level(log::LevelFilter::Info)
      .set_schema_search_path("public".into()); // Setting default PostgreSQL schema

  let db = Database::connect(opt).await;
  Ok(db.unwrap())
}