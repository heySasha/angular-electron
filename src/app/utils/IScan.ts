export interface IScan {
    init(model: any, data: any, processes: number);
    run();
    reset();
    info();
}
