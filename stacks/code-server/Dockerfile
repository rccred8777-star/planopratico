FROM lscr.io/linuxserver/code-server:latest

RUN apt-get update -qq && \
    apt-get install -y -q nodejs npm && \
    npm install -g @anthropic-ai/claude-code && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
