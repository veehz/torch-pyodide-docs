# Getting Started

## Using in Source Academy

torch is available directly in Source Academy's Pyodide environment. No installation needed — simply import and use:

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
print(x)
```

## Your First Model

A simple linear regression in torch:

```python
import torch
import torch.nn as nn
import torch.optim as optim

# Data
x = torch.tensor([[1.0], [2.0], [3.0]])
y = torch.tensor([[2.0], [4.0], [6.0]])

# Model
model = nn.Linear(1, 1)
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Train
for epoch in range(100):
    pred = model(x)
    loss = criterion(pred, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

print(model.weight, model.bias)
```
