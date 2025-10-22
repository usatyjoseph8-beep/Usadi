# USADI – Upload This Folder To GitHub

## Local run (Windows)
powershell> scripts\windows\setup_and_run.ps1

## Mobile (Expo)
cd mobile && npm install && npm start

## Deploy (K8s)
kubectl apply -f infra/k8s/namespaces.yaml
kubectl apply -f infra/k8s/app/backend-deployment.yaml
kubectl apply -f infra/k8s/app/ingress.yaml
