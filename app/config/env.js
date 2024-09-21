const env = {
    
    database: 'umg_salama_16431_wvn6',
    username: 'umg_salama_16431_wvn6_user',
    password: 'lkL0FH0bSrkd49fc6q7ybJGln4svvliJ',
    //host: 'dpg-crmgum23esus73fsvheg-a.oregon-postgres.render.com', //este es el host externo
    host: 'dpg-crmgum23esus73fsvheg-a', //usar este para subir el proyecto a render final
    dialect: 'postgres',
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;