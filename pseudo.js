modules.forEach(module => {
  // 以当前模块作为根模块 创建一个模块分组
  const group = new ModuleGroup({
    root: module
  });
  module.dependencies.forEach(dependency => {
    tryToAdd(group, dependency);
  });
  if (group.modules.length > 1) {
    // 拓扑排序并根据这些模块 创建一个 ConcatenatedModule
    orderedModules = topologicalSort(group.modules);
    concatenatedModule = new ConcatenatedModule(orderedModules);
    // 将 concatenatedModule 添加到一个大的 chunk 中，并从中移除原来的 modules
    chunk.add(concatenatedModule);
    orderedModules.forEach(groupModule => {
      chunk.remove(groupModule);
    });
  }
});

function tryToAdd(group, module) {
  if (group.has(module)) {
    return true;
  }
  if (!hasPreconditions(module)) {
    return false;
  }
  const nextGroup = group;
  const result = module.dependents.reduce((check, dependent) => {
    return check && tryToAdd(nextGroup, dependent);
  }, true);
  if (!result) {
    return false;
  }
  module.dependencies.forEach(dependency => {
    tryToAdd(group, dependency);
  });
  group.merge(nextGroup);
  return true;
}