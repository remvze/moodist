<div align="center">
  <img src="/assets/banner.png" alt="Moodist Logo Banner" />
  <h2>Moodist 🌲</h2>
  <p>Ambient sounds for focus and calm.</p>
  <a href="https://moodist.mvze.net">Visit <strong>Moodist</strong></a> | <a href="https://buymeacoffee.com/remvze">Buy Me a Coffee</a>
  <br/><br/>
  <div>
    <a href="https://gitviews.com/">
      <img src="https://gitviews.com/repo/remvze/moodist.svg" alt="Repo Views" />
    </a>
  </div>
</div>

---

## Features

- 84 curated ambient sounds you can layer into custom soundscapes.
- Smooth fade transitions on play/stop and sleep timer shutdown.
- Shareable mixes via URL with one-click import.
- Presets to save, rename, delete, and instantly reapply mixes.
- Built-in binaural beat and isochronic tone generators.
- Built-in breathing exercise, Pomodoro, countdown, todo, and notepad tools.
- Installable PWA with offline caching.
- Open-source and self-hostable with Docker.
- And much more!

## Self-Hosting

### 1. Run with Docker

```bash
docker run -d \
  --name moodist \
  -p 8080:8080 \
  ghcr.io/remvze/moodist:latest
```

The open:

```
http://localhost:8080
```

### 2. Run with Docker Compose

A `docker-compose.yml` is included at the project root.

Run:

```bash
docker compose up -d
```

Then open:

```
http://localhost:8080
```

### 3. Deploy on Wasmer

[![Deploy to Wasmer](https://img.shields.io/badge/Deploy%20to-Wasmer-171717?logo=wasmer&logoColor=white)](https://wasmer.io/apps/create?github=remvze%2Fmoodist)

Wasmer detects the Astro site, runs `pnpm install` and `pnpm run build`, and serves the generated `dist` folder as static files. The button opens Wasmer's import page for this public repository, where you review the configuration and click Deploy; it does not create a copy of the repository in your GitHub account. To customize the site and redeploy on every push, fork this repository and import your own repository on Wasmer.

## Contributing

Please check [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Support Moodist

Please give a star if you liked this project.

You can also [Buy Me a Coffee](https://buymeacoffee.com/remvze) to help me maintain Moodist.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Third-Party Assets

Some sounds used in this project are sourced from third-party providers and **are subject to different licenses**:

- Sounds licensed under the **Pixabay Content License**: [Pixabay Content License](https://pixabay.com/service/license-summary/)
- Sounds licensed under **CC0**: [Creative Commons Zero License](https://creativecommons.org/publicdomain/zero/1.0/)
