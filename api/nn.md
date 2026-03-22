# torch.nn

Building blocks for computational graphs and neural networks.

## Base Classes

### [[torch.nn.Module]]

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
| [`forward(x)`]((torch.nn.Module.forward)) | Define the computation. Called by `model(x)`. |
| [`parameters()`]((torch.nn.Module.parameters)) | Returns a list of all learnable parameters. |
| [`zero_grad()`]((torch.nn.Module.zero_grad)) | Zeros gradients of all parameters. |

---

### [[torch.nn.Parameter]]

A kind of Tensor that is to be considered a module parameter.

---

### [[torch.nn.Sequential]]

A sequential container. Modules will be added to it in the order they are passed in the constructor.

```python
model = nn.Sequential(
    nn.Linear(2, 4),
    nn.ReLU(),
    nn.Linear(4, 1)
)
```

---

## Layers

### [[torch.nn.Linear]]

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

### [[torch.nn.Conv1d]] **(TODO)**

Applies a 1D convolution over an input signal composed of several input planes.

---

### [[torch.nn.Conv2d]] **(TODO)**

Applies a 2D convolution over an input signal composed of several input planes.

---

### [[torch.nn.Conv3d]] **(TODO)**

Applies a 3D convolution over an input signal composed of several input planes.

---

## Loss Functions

### [[torch.nn.MSELoss]]

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

### [[torch.nn.L1Loss]]

```python
nn.L1Loss()
```

Creates a criterion that measures the mean absolute error (MAE) between each element in the input $x$ and target $y$.

---

### [[torch.nn.BCELoss]]

```python
nn.BCELoss()
```

Creates a criterion that measures the Binary Cross Entropy between the target and the input probabilities.

---

### [[torch.nn.CrossEntropyLoss]] **(TODO)**

```python
nn.CrossEntropyLoss()
```

Cross entropy loss for classification tasks.

---

## Activation Functions

### [[torch.nn.ReLU]]

```python
nn.ReLU()
```

Applies the rectified linear unit function element-wise: `f(x) = max(0, x)`.

---

### [[torch.nn.Sigmoid]]

```python
nn.Sigmoid()
```

Applies the sigmoid function: `f(x) = 1 / (1 + e^(-x))`.

---

## Functional API

Functional interfaces are exposed under `torch.nn.functional`.

### [[torch.nn.functional.relu]]
Applies the rectified linear unit function element-wise.

### [[torch.nn.functional.sigmoid]]
Applies the sigmoid function element-wise.
