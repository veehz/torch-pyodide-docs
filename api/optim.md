# torch.optim

Optimization algorithms.

All optimizers take `model.parameters()` and a learning rate, then step the weights after a backward pass.

## Basic Usage

```python
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Inside training loop:
optimizer.zero_grad()
loss.backward()
optimizer.step()
```

---

## Optimizers

### optim.SGD

```python
optim.SGD(params, lr, momentum=0)
```

Stochastic Gradient Descent.

**Parameters**

| Name | Type | Default | Description |
|---|---|---|---|
| `params` | `list` | — | List of parameters (from `model.parameters()`). |
| `lr` | `float` | — | Learning rate. |
| `momentum` | `float` | `0` | Momentum factor. |

**Example**

```python
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
```

---

### optim.Adam

```python
optim.Adam(params, lr=0.001, betas=(0.9, 0.999), eps=1e-8)
```

Adam optimizer.

**Parameters**

| Name | Type | Default | Description |
|---|---|---|---|
| `params` | `list` | — | List of parameters. |
| `lr` | `float` | `0.001` | Learning rate. |
| `betas` | `tuple` | `(0.9, 0.999)` | Coefficients for computing running averages. |
| `eps` | `float` | `1e-8` | Numerical stability term. |

**Example**

```python
optimizer = optim.Adam(model.parameters(), lr=0.001)
```

---

## Methods

All optimizers share these methods:

### .step()

Updates all parameters using their stored gradients.

### .zero_grad()

Resets gradients of all tracked parameters to zero. Call this before each backward pass.
