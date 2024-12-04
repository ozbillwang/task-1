### Features:

* Build a Docker image to deploy the React project as a website, `cd frontend ; npm install; npm run build; npm start`
* Customize the website to display my name.
* Support multi-arch docker image builds, suitable for Mac M1/M2 chip users to run tests locally. `docker pull ozbillwang/challenge`
* Create a GitHub Action workflow to automate the build and push of Docker images to Docker Hub, can support for GHCR or AWS ECR if needed.
* Create Helm charts and deploy the website, such as `helm upgrade --install`
  
<img width="511" alt="image" src="https://github.com/user-attachments/assets/2cc917f1-758a-4084-89c0-9573d93ba016">

Github action:

https://github.com/ozbillwang/task-1/actions

Docker Hub:

https://hub.docker.com/repository/docker/ozbillwang/challenge/general

### What else you would do with your website, and how you would go about doing it if you had more time.

Three main objectives:  scalability, reliability, and security

Todo list:
* Set dedicated namespace to isolate applications and resources.
* Adjust resource limits( cpu / memory request and limits) to optimize pod performance
* Integrate with ingress controller to configure aws application load balancer (ALB) for better performence, combined with AWS Cloudfront service as well. 
* Add HTTP/SSL certificate management using cert-manager
* Deploy helm charts via ArgoCD.
* (Optional) implement a service mesh, such as istio, for advanced network feature.
* Set up Prometheus, Loki, and grafana to collect logs and metrics, generate dashboardis for monitoring service health.
* Deploy blackbox exporter (or similar) and AlertManager for website health monitoring and get alerts if web service is down, via channels like slack, or MS Teams
* Deploy node exporter or application-specific exporters to collect additional metrics and generate alarts for dashboards.
* Implement velero (or similar) for regular backups of kubernetes configuration
* Enhance network policy for advanced security 
* Configure RBAC for fine-grained access control
* Install External Secrets Operator (ESO) if managing API key or other credentials
* Run containers as non-root users
* Enable docker image scan (enble in aws ecr) before production deployment
* enable HPA to adjust replicatas based on CPU/Memory usage or custom metrics, such as network connections.
* Prepare the rollback plan

### Alternative solutions that you could have taken but didn’t and explain why.

If the website is static page only, deploy the website to S3 bucket with website hosting feature enable, or using AWS amplify , then combined with AWS Cloudfront (CDN), it would reduce the complexity to deploy and operations, but it is only suitable for static websites.

Another choice is to host the frontend website (static pages only) on Heroku or Vercel, but deploying code to third-party platform may raise concerns about security, reliability and compliance. These platforms offer less control, which ciould be problem for maintaining.

More choice, think about AWS ECS or even AWS Elastic Beanstalk, they both support containerized applications, and simple to set up. But they lack the advanced features and flexibility that kubernetes offers. Since the company has a strong Kubernetes-focused culture and a well-established infrastructure. By continuing to deploy applications on Kubernetes, the team ensures operational consistency, simplifies maintenance, and streamlines the management of various applications using uniform patterns and tools.

### What would be required to make this a production grade website that would be developed on by various development teams. The more detail, the better!

1. Architecture & Infrasture

* Break the application into smaller, independently deployable services (frontend, backend, authentication, payment, etc.). This allows each team to work on different components independently while ensuring scalability and flexibility.

* Utilize Infrastructure as Code (IaC) tools like Terraform or AWS CloudFormation for provisioning and managing infrastructure.

* Use Kubernetes (K8s) for container orchestration to manage application deployment, scaling, and operation. Set up multiple Kubernetes clusters to isolate non-production and production environments, ensuring high availability and disaster recovery, with a shared container image registry.

* Utilize Helm charts (or Kustomize) to define and deploy Kubernetes resources.

* For managing microservices communication, including load balancing, service discovery, observability, and security between services.

* Set up a CI/CD pipeline using GitHub Actions, Jenkins, or GitLab to automate the building, testing, and deployment of applications across different environments (development, staging, production).

* Automate code quality checks (e.g., linting, static analysis), security scans, and tests in the pipeline.

* Implement blue-green or canary deployments to minimize risk during new releases.

* Implement Horizontal Pod Autoscaling (HPA) based on CPU, memory, or custom metrics (e.g., request count, error rate) for applications running on Kubernetes.

2. Security

* Use Role-Based Access Control (RBAC) to manage permissions within the Kubernetes cluster.

* Integrate SSO (Single Sign-On) via platforms like Okta, Azure AD, or Auth0.

* Use Cert-Manager to automate the management of SSL/TLS certificates in Kubernetes Configure HTTPS with AWS ALB or Nginx Ingress Controller.

* Integrate Snyk or Aqua Security to scan container images for vulnerabilities before deployment.

* Regularly patch software and dependencies.

* Implement Network Policies in Kubernetes to control traffic flow between pods.

* Use Web Application Firewalls (WAF) and DDoS protection services.

* Ensure that sensitive data (e.g., user information, payment details) is encrypted both in transit and at rest using protocols like TLS/SSL and AES encryption. 

3. Development and Collaboration

* Use Git (e.g., GitHub, GitLab, Bitbucket) for version control with appropriate branching strategies (e.g., GitFlow, trunk-based development).

* Adopt Agile methodologies (Scrum or Kanban) for iterative development with regular sprint cycles and backlog grooming.

* Set up Jira, Aha, or Asana for tracking tasks and project management.

* Use Docker for local development and testing environments to ensure consistency between dev and production environments.

* Set up dev/staging/production environments in Kubernetes with separate namespaces for isolation.

* Use Slack, Microsoft Teams, or Discord for team communication and integration with alerting tools.

* Set up Confluence for documentation and knowledge sharing.

4. Monitoring & Observability

* Centralize logs using ELK Stack (Elasticsearch, Logstash, Kibana) or Loki with Prometheus & Grafana for querying and visualizing logs.

* Use Fluentd or Logstash or Prometheus exporter to aggregate and forward logs from different services into centralized logging solutions.

* Set up Prometheus for collecting metrics from various services, with Grafana dashboards for visualizing system performance (e.g., CPU usage, request/response latency, error rates).

* Set up alerting through Prometheus Alertmanager, PagerDuty for proactive incident management.

* Integrate alerting with communication tools like Slack or MS Teams for notifications.

* Use tools like Datadog, New Relic, AppDynamic or Dynatrace for real-time monitoring of application performance and user experience.

5. Continuous Improvement

* Set up unit testing, integration testing, and end-to-end (E2E) testing

* Implement Test-Driven Development (TDD) for critical components.

* Use code coverage tools to ensure adequate test coverage.

* Introduce Chaos Monkey or similar tools for running controlled experiments in production to ensure resilience by simulating failures (e.g., service or server crashes).

6. Deployment & Maintenance

* Standardize application deployments using Helm charts for Kubernetes, ensuring consistency and repeatability.

* Automate Helm chart updates (Kustomize) and rollbacks as part of the CI/CD pipeline.

* Use managed databases like AWS RDS (or Aurora) and DynamoDB for enhanced scalability, availability, and ease of maintenance.

* Set up Database Sharding for high-scale systems.

* Implement Velero or similar tools for backing up and restoring Kubernetes resources and persistent volumes.

* Regularly test backup and recovery procedures.

7. User Experience & Frontend

* Use modern frameworks like React, Vue.js, or Angular for building dynamic and responsive UIs.

* Ensure the frontend is optimized for both desktop and mobile devices.

* Set up CloudFront (AWS), or Cloudflare for distributing content globally and reducing latency.

* Implement HTTP caching and browser caching to improve load times.

8. Support & Documentation

* Create comprehensive documentation 

* Maintain user documentation and developer guides to ensure ease of onboarding for new developers and users.

* Ensure that support requests are routed to the appropriate teams for timely resolution.
