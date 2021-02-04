#include <iostream>
using namespace std;
int main()
{
    int t;
    cin>>t;
    while(t--){
        long long n,sum=0;
        long long k;
        cin>>k;
        for(int i=1;i<n;i++){
            cin>>n;
            sum=sum+abs(n-k);
            k=n;
        }
        cout<<sum<<endl;
    }
    return 0;
}