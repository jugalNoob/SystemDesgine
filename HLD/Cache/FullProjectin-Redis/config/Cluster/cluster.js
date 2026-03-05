

import * as os from 'node:os';
import cluster from 'node:cluster';
import process from 'node:process';


const numCPUs =os.cpus().length;

const startServer = (app, port) => {
  if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();

      cluster
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(
        `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal})`
      );
      cluster.fork(); // restart worker
    });

  } else {
    try {
      const server = app.listen(port, () => {
        console.log(
          `Worker ${process.pid} listening on http://localhost:${port}`
        );
      });

      server.on('error', (err) => {
        console.error(`Worker ${process.pid} server error:`, err);
      });

    } catch (err) {
      console.error(`Worker ${process.pid} failed to start`, err);
      process.exit(1);
    }
  }
};

export default startServer;
