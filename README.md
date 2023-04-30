# Celery Insights

Welcome to Celery Insights, the ultimate monitoring tool for your Celery cluster!

With Celery Insights, you can effortlessly track your Celery cluster in real-time. 
Our modern web interface enables you to conveniently view worker status, 
task information, and workflow graphs, all updated using websockets.

Inspired by Celery Flower, this tool takes Celery monitoring to the next level.  
Try Celery Insights today and see the difference for yourself!

## Getting Started

Celery Insights is provided as a Docker image and can be launched using a single command:
```shell
docker run -p 8555:8555 --name celery-insights ghcr.io/danyi1212/celery-insights:latest
```

Next, navigate to `http://localhost:8555/` and begin the welcome tour.

### Advanced setup
Celery Insights comes pre-configured for localhost Redis as Result Backend and RabbitMQ as Broker.

Utilize the [BROKER_URL](#brokerurl) and [RESULT_BACKEND](#resultbackend) environment variables to customize the
configuration for your specific setup.
For instance, the following example demonstrates a setup with Redis as the Broker and Memcache as the Result Backend:
```shell
docker run -p 8555:8555 --name celery-insights -e BROKER_URL=redis://host.docker.internal:6379/0 -e RESULT_BACKEND=cache+memcached://host.docker.internal:11211/ ghcr.io/danyi1212/celery-insights:latest
```
If you need more advanced Celery configuration, you can configure using a [Config File](#setup-with-config-file).

### Asking Questions and Reporting Bugs

If you've found a bug, we would like to know, so we can fix it!
Please review the [contributing guidelines](CONTRIBUTING.md) for guidance on getting started.

For any questions, suggestions, or feature requests, please join the conversation in GitHub Discussions.

> :warning: **WARNING**
>
> If you have discovered a security vulnerability, please **DO NOT** file a public issue.  
> Instead, please report them directly to danyi1212@users.noreply.github.com.

## Configuration

Celery Insights can be configured using environment variables.
Additional preferences can be found on the Settings page within the app.

By default, Celery Insights uses only Broker URL and Result Backend to connect to your Celery Cluster.

In case you have set up a [Config File](#setup-with-config-file), 
Celery Insights will prefer it over the `BROKER_URL` and `RESULT_BACKEND` environment variables.

> :exclamation: Tip
> 
> If you want Celery Insights to access a local service, like a Redis container, use `host.docker.internal` instead of `localhost`.
> [See more on Docker docs](https://docs.docker.com/desktop/networking/#use-cases-and-workarounds-for-all-platforms)

#### BROKER_URL
Default: `amqp://guest:guest@host.docker.internal/`

Specify the Celery Broker URL.
[See more on Celery docs.](https://docs.celeryq.dev/en/stable/userguide/configuration.html#broker-url)

#### RESULT_BACKEND
Default: `redis://host.docker.internal:6379/0`

Specify the Celery Result Backend.
See more on Celery docs.](https://docs.celeryq.dev/en/stable/userguide/configuration.html#result-backend)]

#### CONFIG_FILE
Default: `/app/config.py`

Specify the path where the Config File should be located for Celery Insights. 
For instructions on how to set it up, refer to the [Setup with Config File](#setup-with-config-file) section.

#### HOST
Default: `0.0.0.0`

Specify Celery Insights hostname. By default, it will listen to all IP addresses.

#### PORT
Default: `8555`

Specify Celery Insights port number.

#### TIMEZONE
Default: "UTC"

Specify the time zone for your cluster.
For correct timestamps, it should be the same as your Celery nodes.
All timestamps shown on the app are translated to the client's local timezone.

#### LOG_LEVEL
Default: `INFO`

Specify Celery Insights log level.

#### DEBUG
Default: `False`

Enables Celery Insights to run in debug mode.

### Setup with Config File

In certain situations, connecting to your Celery cluster may require more than simply specifying the Broker URL and
Result Backend.
For such cases, you can configure Celery Insights 
using a [Celery configuration file](https://docs.celeryq.dev/en/stable/userguide/configuration.html).

Create a `config.py` file containing all the necessary Celery configurations. For example:
```python
broker_url = 'sentinel://localhost:26379;sentinel://localhost:26380;sentinel://localhost:26381'
broker_transport_options = {
    'sentinel_kwargs': {
        'master_name': "cluster1",
        'password': "password",
    },
}
result_backend_transport_options = {'master_name': "cluster1"}
result_accept_content = "msgpack"
```

Then mount it inside Celery Insights container, for example:
```shell
docker run -v ./config.py:/app/config.py -p 8555:8555 --name celery-insights ghcr.io/danyi1212/celery-insights:latest
```

## Contributing

To contribute to Celery Insights, please review the [contributing guidelines](CONTRIBUTING.md) for guidance on how to
get started.

## License

Celery Insights is licensed under the BSD 3-clause license. See the [LICENSE](LICENSE) file for details.

### Thank you for exploring Celery Insights! We hope it proves to be a valuable addition to your Celery cluster.
