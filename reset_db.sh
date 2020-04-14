#for running the tests locally

sudo runuser -l  postgres -c 'psql -c "drop database unittest_backend;"'
sudo runuser -l  postgres -c 'psql -c "create database unittest_backend;"'
sudo runuser -l  postgres -c 'psql -c "grant all privileges on database unittest_backend to test_user;"'