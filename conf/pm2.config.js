var apps = [];
var namespace = "static-site";

switch (process.env.NODE_ENV)
{
    default:
    case 'production':
        apps.push({
            name: namespace,
            interpreter: "node",
            script: "./dist/server/server.js",
            exec_mode: "fork",
            env: {
                "NODE_ENV": "production"
            },
            source_map_support: false,

            error_file: "./tmp/.server.log",
            out_file: "./tmp/.server.log",
            pid_file: "./tmp/.server.pid",
            combine_logs: true,
            log_date_format: "DD-MM-YYYY HH:mm",

            max_memory_restart: "500M",
            max_restarts: 10
        });
        break;
    
    case 'development':
        apps.push({
            name: namespace + "-webpack",
            interpreter: "node",
            script: "./node_modules/webpack/bin/webpack.js",
            args: "--config conf/webpack.config.js --watch",
            exec_mode: "fork",
            env: {
                "NODE_ENV": "development"
            },
            source_map_support: false,

            log_date_format: "DD-MM-YYYY HH:mm",

            max_memory_restart: "700M",
            max_restarts: 3
        });

        apps.push({
            name: namespace + "-dev",
            interpreter: "node",
            script: "./dist/server/server.js",
            exec_mode: "fork",
            env: {
                "NODE_ENV": "development"
            },
            source_map_support: false,

            log_date_format: "DD-MM-YYYY HH:mm",

            watch: ["dist/server"],
            ignore_watch: [],

            max_memory_restart: "500M"
        });
        break;
}

module.exports = { apps: apps }
