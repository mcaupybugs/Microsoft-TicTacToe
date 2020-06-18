#include <bits/stdc++.h>
using namespace std;
int arr[3][3];
void initialize()
{
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            arr[i][j] = -1;
        }
    }
}
bool didEnd()
{
    for (int i = 0; i < 3; i++)
    {
        if (arr[i][0] == arr[i][1] && arr[i][1] == arr[i][2] && arr[i][0] != -1)
        {
            return true;
        }
    }
    for (int i = 0; i < 3; i++)
    {
        if (arr[0][i] == arr[1][i] && arr[1][i] == arr[2][i] && arr[0][i] != -1)
        {
            return true;
        }
    }
    for (int i = 0; i < 1; i++)
    {
        if (arr[i][i] == arr[i + 1][i + 1] && arr[i + 1][i + 1] == arr[i + 2][i + 2] && arr[i + 1][i + 1] != -1)
        {
            return true;
        }
    }
    for (int i = 0; i < 1; i++)
    {
        if (arr[i][2 - i] == arr[i + 1][1 - i] && arr[i + 1][1 - i] == arr[i + 2][i] && arr[i + 1][1] != -1)
        {
            return true; // there may be error check again
        }
    }
    return false;
}
void printMatrix()
{
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;
}
bool isFull()
{
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            if (arr[i][j] == -1)
            {
                return false;
            }
        }
    }
    return true;
}
int minimax(bool maximizing)
{
    if (didEnd() == true && maximizing == true)
    {
        return -1;
    }
    if (didEnd() == true && maximizing == false)
    {
        return 1;
    }
    if (isFull() == true)
    {
        return 0;
    }
    int index_i, index_j, score = INT_MIN;
    if (maximizing)
    {
        int bestScore = INT_MIN;
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                if (arr[i][j] == -1)
                {
                    arr[i][j] = 1;
                    score = minimax(false);
                    arr[i][j] = -1;
                    if (score > bestScore)
                    {
                        bestScore = score;
                    }
                }
            }
        }
        return bestScore;
    }
    else
    {
        int bestScore = INT_MAX;
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                if (arr[i][j] == -1)
                {
                    arr[i][j] = 0;
                    score = minimax(true);
                    arr[i][j] = -1;
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}
void move(bool human)
{
    if (human == true)
    {
        //cout << "R";
        int index_i, index_j;
        int bestScore = INT_MIN;
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                if (arr[i][j] == -1)
                {
                    arr[i][j] = 1;
                    int score = minimax(false);
                    arr[i][j] = -1;
                    if (score > bestScore)
                    {
                        bestScore = score;
                        index_i = i, index_j = j;
                    }
                }
            }
        }
        cout << "Setting " << index_i << " " << index_j << " as 1" << endl;
        arr[index_i][index_j] = 1;
        printMatrix();
    }
    else
    {
        int index_i, index_j;
        int bestScore = -1;
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                if (arr[i][j] == -1)
                {
                    arr[i][j] = 0;
                    int score = minimax(false);
                    arr[i][j] = -1;
                    if (score > bestScore)
                    {
                        bestScore = score;
                        index_i = i, index_j = j;
                    }
                }
            }
        }
        cout << "Setting " << index_i << " " << index_j << " as 0" << endl;
        printMatrix();
        arr[index_i][index_j] = 0;
    }
}
void Game()
{
    initialize();
    cout << "Enter H for first human move and R for robot move" << endl;
    char ch;
    cin >> ch;
    while (didEnd() != true)
    {
        //cout << "R";
        if (ch == 'H')
        {
            move(true);
            ch = 'R';
            printMatrix();
        }
        else
        {
            ch = 'H';
            cout << "ENter the coordinaate" << endl;
            int a, b;
            cin >> a >> b;
            while (a < 0 || b < 0 || a > 2 || b > 2)
            {
                cout << "Invalid enter again" << endl;
                cin >> a >> b;
            }
            arr[a][b] = 0;
            printMatrix();
        }
        if (isFull() == true)
        {
            cout << "DRAW \n";
            break;
        }
    }
}
int main()
{
    Game();
}
