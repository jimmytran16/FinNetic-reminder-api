com=$1;
#  Check if there is an arg being passed in (this will be the commit message)
if [ -z "$com" ]
    then 
        echo 'Please enter a commit messasge as arg1'
        exit
else 
    echo "Adding ......"
    git add .
    echo "Commiting ....."
    git commit -m "$com"
    echo "Pushing to remote github..."
    git push origin master
    echo "Deploying....."
    git push heroku master
fi