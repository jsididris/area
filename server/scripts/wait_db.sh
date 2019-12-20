#!/bin/bash

echo "Waiting database to launch on 5432..."

while ./scripts/nc -z localhost 5432; do
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo "Database launched"
