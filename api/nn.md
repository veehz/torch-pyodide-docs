# torch.nn

Neural network building blocks.

## Base Class

### nn.Module

All neural network components should subclass `nn.Module`.

```python
class MyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(2, 1)

    def forward(self, x):
        return self.linear(x)
```

**Key Methods**

| Method | Description |
|---|---|
| `.forward(x)` | Define the computation. Called by `model(x)`. |
| `.parameters()` | Returns a list of all learnable parameters. |
| `.zero_grad()` | Zeros gradients of all parameters. |

---

## Layers

### nn.Linear

```python
nn.Linear(in_features, out_features, bias=True)
```

Applies a linear transformation: `y = xW^T + b`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `in_features` | `int` | Size of each input sample. |
| `out_features` | `int` | Size of each output sample. |
| `bias` | `bool` | If `False`, no bias term is added. Default: `True`. |

**Attributes**

| Attribute | Description |
|---|---|
| `.weight` | Learnable weight tensor of shape `(out_features, in_features)`. |
| `.bias` | Learnable bias tensor of shape `(out_features,)`. |

**Example**

```python
layer = nn.Linear(4, 2)
x = torch.randn(3, 4)  # batch of 3
out = layer(x)          # shape: (3, 2)
```

---

## Loss Functions

### nn.MSELoss

```python
nn.MSELoss()
```

Mean Squared Error loss: `loss = mean((pred - target)^2)`.

**Example**

```python
criterion = nn.MSELoss()
pred = torch.tensor([1.0, 2.0])
target = torch.tensor([1.5, 2.5])
loss = criterion(pred, target)  # scalar tensor
```

---

### nn.CrossEntropyLoss

```python
nn.CrossEntropyLoss()
```

Cross entropy loss for classification tasks.

---

## Activation Functions

### nn.ReLU

```python
nn.ReLU()
```

Applies the rectified linear unit function element-wise: `f(x) = max(0, x)`.

---

### nn.Sigmoid

```python
nn.Sigmoid()
```

Applies the sigmoid function: `f(x) = 1 / (1 + e^(-x))`.
