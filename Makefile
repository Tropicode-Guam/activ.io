.PHONY: build-development
build-development: ## Build the development docker image.
	docker-compose -f docker/development/docker-compose.yml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker-compose -f docker/development/docker-compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker-compose -f docker/development/docker-compose.yml down

.PHONY: build-staging
build-staging: ## Build the staging docker image.
	docker-compose -f docker/staging/docker-compose.yml build

.PHONY: start-staging
start-staging: ## Start the staging docker container.
	docker-compose -f docker/staging/docker-compose.yml up -d

.PHONY: stop-staging
stop-staging: ## Stop the staging docker container.
	docker-compose -f docker/staging/docker-compose.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker-compose -f docker/production/docker-compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker-compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker-compose -f docker/production/docker-compose.yml down

.PHONY: check-pr
check-pr: ## run export in (subshell) to not dirty environment
	docker pull ghcr.io/tropicode-guam/blue-guam:pr-$(pr)
	(export TAG="pr-$(pr)"; docker compose -f docker/production/docker-compose.yml up)
