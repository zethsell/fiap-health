runDev:
	docker build ./api 				-t zeth/fiap-health-api-prod
	docker build ./app 				-t zeth/fiap-health-app-prod
	docker build ./micro-consult 	-t zeth/fiap-health-micro-consult-prod
	docker build ./micro-exam 		-t zeth/fiap-health-micro-exam-prod
	docker build ./micro-schedule	-t zeth/fiap-health-micro-schedule-prod
	docker build ./micro-user 		-t zeth/fiap-health-micro-user-prod

	cd app  && docker push zeth/fiap-health-micro-consult-prod
	cd app  && docker push zeth/fiap-health-micro-exam-prod
	cd app  && docker push zeth/fiap-health-micro-schedule-prod
	cd app  && docker push zeth/fiap-health-micro-user-prod
	cd app  && docker push zeth/fiap-health-app-prod
	cd api  && docker push zeth/fiap-health-api-prod

	skaffold dev