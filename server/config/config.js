export default {
  development: {
    username: 'ozimos',
    password: 'l7bz4ZJRmZNPicPIHYpo',
    database: 'events_manager_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'ozimos',
    password: 'l7bz4ZJRmZNPicPIHYpo',
    database: 'events_manager_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
