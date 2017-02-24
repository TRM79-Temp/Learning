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

echo Check complete. >> %statusFile%

C:\Users\IUAD0YO0\Desktop\lf_to_crlf.exe %statusFile%
notepad %statusFile%