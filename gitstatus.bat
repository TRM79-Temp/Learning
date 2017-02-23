set statusFile="C:\Users\Roman\Desktop\gitstatus.txt"

echo Starting check... > %statusFile%
echo. >> %statusFile%

cd C:\Users\Roman\github\AngularJS
echo %cd% >> %statusFile%
git status >> %statusFile%
echo. >> %statusFile%

cd C:\Users\Roman\github\Learning
echo %cd% >> %statusFile%
git status >> %statusFile%
echo. >> %statusFile%

cd C:\Users\Roman\github\WindowsManipulations
echo %cd% >> %statusFile%
git status >> %statusFile%
echo. >> %statusFile%

echo. >> %statusFile%
echo Check complete. >> %statusFile%

notepad %statusFile%