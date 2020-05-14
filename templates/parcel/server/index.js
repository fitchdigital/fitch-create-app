import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import routes from './routes';

const init = async () => {
    const port = process.env.PORT || 1234;

    const server = Hapi.server({
        port,
        host: '0.0.0.0',
        routes: {
            cors: true,
        },
    });

    await server.register(Inert);

    server.route(routes);

    await server.start();
    console.log(`🚀 Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

export default init();
