#!/bin/bash
export PATH="/Users/theranosis_dx/.nvm/versions/node/v22.22.0/bin:$PATH"
cd /Users/theranosis_dx/projects/panchangam
exec npx wrangler pages dev . --compatibility-date=2025-01-01 --port=8788
